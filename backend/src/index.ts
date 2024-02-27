import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import {
  signupInput,
  signinInput,
  createPostInput,
  updatePostInput,
} from "@jayeshn/blog-common/dst";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("*", cors());

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) return c.status(411);
  try {
    const jwt_token = jwt.split(" ")[1];
    const payload = await verify(jwt_token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ message: "unauthorized" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (e: any) {
    c.status(500);
    return c.json({ message: e.error.message });
  }
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const result = signupInput.safeParse(body);
    if (!result.success) {
      c.status(400);
      return c.json({
        message: result.error.errors[0].message,
      });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    return c.status(411);
  }
});

app.post("/api/v1/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const result = signinInput.safeParse(body);
    if (!result.success) {
      c.status(400);
      return c.json({
        message: result.error.errors[0].message,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) return c.status(500);
    if (user.password === body.password) {
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt, message: "signed in successfully" });
    } else {
      return c.json({ message: "either wrong password or you fuked up" });
    }
  } catch (e) {
    return c.status(403);
  }
});

app.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const result = createPostInput.safeParse(body);
    if (!result.success) {
      c.status(400);
      return c.json({
        message: result.error.errors[0].message,
      });
    }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (e: any) {
    c.status(500);
    return c.json({ message: e?.error?.message });
  }
});

app.get("/api/v1/user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const token = c.req.header("Authorization");
  if (!token) {
    c.status(411);
    return c.json({ message: "Token not found" });
  }
  try {
    const jwt_token = token.split(" ")[1];
    const payload = await verify(jwt_token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ message: "unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }
    c.set("userId", payload.id);
    return;
  } catch (e: any) {
    c.status(500);
    return c.json({ message: e.message });
  }
});

app.get("/api/v1/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({ blog });
  } catch (e: any) {
    c.status(500);
    return c.json({ message: e?.error?.message });
  }
});

app.put("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const result = updatePostInput.safeParse(body);
    if (!result.success) {
      c.status(400);
      return c.json({
        message: result.error.errors[0].message,
      });
    }
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ message: "changed successfully!" });
  } catch (e: any) {
    c.status(500);
    return c.json({ message: e?.error?.message });
  }
});

export default app;
