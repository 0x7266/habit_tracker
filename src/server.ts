import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const server = fastify({ logger: true });
const prisma = new PrismaClient();

server.register(cors);

server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await prisma.habit.findMany();
    await reply.send(result);
  } catch (error) {
    console.error(error);
    await reply.status(404).send("Something wrong");
  }
});
server.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const result = await prisma.habit.findUnique({
      where: {
        id: Number(id),
      },
    });
    await reply.send(result);
  } catch (error) {
    console.error(error);
    await reply.status(404).send("Something wrong");
  }
});
server.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { title } = request.body as HabitBodyInterface;
    const result = await prisma.habit.create({
      data: {
        title,
      },
    });
    await reply.send(result);
  } catch (error) {
    console.error(error);
    await reply.status(404).send("Something wrong");
  }
});
server.patch("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { title } = request.body as HabitBodyInterface;
    const { id } = request.params as { id: string };
    const result = await prisma.habit.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
      },
    });
    await reply.send(result);
  } catch (error) {
    console.error(error);
    await reply.status(404).send("Something wrong");
  }
});
server.delete("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const result = await prisma.habit.delete({
      where: {
        id: Number(id),
      },
    });
    await reply.send(result);
  } catch (error) {
    console.error(error);
    await reply.status(404).send("Something wrong");
  }
});

server.listen({ port: 3333 }, (error, address) => {
  if (error) {
    server.log.error(error);
  }
});

interface HabitBodyInterface {
  title: string;
}
