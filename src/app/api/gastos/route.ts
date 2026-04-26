import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const gasto = await prisma.gasto.create({
    data: {
      nome: body.nome,
      valor: Number(body.valor),
    },
  });

  return Response.json(gasto);
}

export async function GET() {
  const gastos = await prisma.gasto.findMany();

  return Response.json(gastos);
}