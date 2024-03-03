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

app.get("/", (c) => {
  return c.text("Hello from cloudflare worker");
});

app.post("/api/v1/signup", async (c) => {
  const body = await c.req.json();
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
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
    const defaultPost = prisma.post.create({
      data: {
        title: "Getting Started!",
        content:
          "This is a website made for note taking which is used to display the available notes, make new notes and do all that while also not needing to perform constant page reloads!",
        authorId: user.id,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(411);
    return c.json({ bigError: e });
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
      return c.json({ found: false });
    }
    c.set("userId", payload.id);
    return c.json({ found: true });
  } catch (e: any) {
    c.status(500);
    return c.json({ message: e.message });
  }
});

app.use("/api/v1/*", async (c, next) => {
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

app.get("/api/v1/newblog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const newPost = await prisma.post.create({
      data: {
        authorId: c.get("userId"),
      },
    });
    return c.json({
      newPost,
    });
  } catch (e: any) {
    c.status(500);
    console.log(e);
    return c.json({ message: e?.error?.message });
  }
});

app.get("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.get("userId");
    if (!id) {
      c.status(400);
      return c.json({ message: "User not found" });
    }
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
    if (!posts) return c.json({ posts: [{}] });
    return c.json({
      posts,
    });
  } catch (e: any) {
    c.status(400);
    return c.json({ message: e?.error?.message });
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
    const updateData: any = {};
    if (body.title) {
      updateData.title = body.title;
    }
    if (body.content) {
      updateData.content = body.content;
    }

    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: updateData,
    });

    return c.json({ message: "changed successfully!" });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e });
  }
});

app.delete("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    if (!body.id) {
      c.status(411);
      return c.json({ error: "id of post not sent!", deleted: false });
    }
    await prisma.post.delete({
      where: {
        authorId: userId,
        id: body.id,
      },
    });
    return c.json({ deleted: true });
  } catch (e) {
    c.status(500);
    return c.json({ error: e, deleted: false });
  }
});

export default app;
