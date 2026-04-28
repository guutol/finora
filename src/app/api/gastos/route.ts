import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const nomeOriginal = body.nome;
  const nomeNormalizado = body.nome.toLowerCase();

  let nomeCategoria = "Outros";

  if (
    nomeNormalizado.includes("academia") ||
    nomeNormalizado.includes("gym") ||
    nomeNormalizado.includes("treino")
  ) {
    nomeCategoria = "Academia";
  } else if (
    nomeNormalizado.includes("uber") ||
    nomeNormalizado.includes("99") ||
    nomeNormalizado.includes("onibus") ||
    nomeNormalizado.includes("ônibus") ||
    nomeNormalizado.includes("bus")
  ) {
    nomeCategoria = "Transporte";
  } else if (
    nomeNormalizado.includes("ifood") ||
    nomeNormalizado.includes("mercado") ||
    nomeNormalizado.includes("lanche") ||
    nomeNormalizado.includes("restaurante") ||
    nomeNormalizado.includes("delivery") ||
    nomeNormalizado.includes("pizza") ||
    nomeNormalizado.includes("sushi")
  ) {
    nomeCategoria = "Alimentação";
  } else if (
    nomeNormalizado.includes("netflix") ||
    nomeNormalizado.includes("spotify") ||
    nomeNormalizado.includes("prime") ||
    nomeNormalizado.includes("hbo") ||
    nomeNormalizado.includes("max") ||
    nomeNormalizado.includes("disney") ||
    nomeNormalizado.includes("chatgpt") ||
    nomeNormalizado.includes("claude") ||
    nomeNormalizado.includes("gemini") ||
    nomeNormalizado.includes("grok") ||
    nomeNormalizado.includes("youtube") ||
    nomeNormalizado.includes("discord")
  ) {
    nomeCategoria = "Assinaturas";
  } else if (
    nomeNormalizado.includes("cinema") ||
    nomeNormalizado.includes("jogo") ||
    nomeNormalizado.includes("games") ||
    nomeNormalizado.includes("steam") ||
    nomeNormalizado.includes("playstation") ||
    nomeNormalizado.includes("psn") ||
    nomeNormalizado.includes("xbox") ||
    nomeNormalizado.includes("bar") ||
    nomeNormalizado.includes("cerveja") ||
    nomeNormalizado.includes("balada") ||
    nomeNormalizado.includes("festa") ||
    nomeNormalizado.includes("show") ||
    nomeNormalizado.includes("evento") ||
    nomeNormalizado.includes("ingresso") ||
    nomeNormalizado.includes("role") ||
    nomeNormalizado.includes("rolê")
  ) {
    nomeCategoria = "Lazer";
  } else if (
    nomeNormalizado.includes("shein") ||
    nomeNormalizado.includes("shopee") ||
    nomeNormalizado.includes("mercado livre") ||
    nomeNormalizado.includes("amazon") ||
    nomeNormalizado.includes("aliexpress") ||
    nomeNormalizado.includes("shopping")
  ) {
    nomeCategoria = "Compras";
  }

  const categoria = await prisma.categoria.findFirst({
    where: {
      nome: nomeCategoria,
    },
  });

  if (!categoria) {
    return Response.json(
      { error: `Categoria ${nomeCategoria} não encontrada` },
      { status: 400 },
    );
  }

  const gasto = await prisma.gasto.create({
    data: {
      nome: nomeOriginal,
      valor: Number(body.valor),
      categoriaId: categoria.id,
    },
    include: {
      categoria: true,
    },
  });

  return Response.json(gasto);
}

export async function GET() {
  const gastos = await prisma.gasto.findMany({
    include: {
      categoria: true,
    },
  });

  return Response.json(gastos);
}

export async function PUT(req: Request) {
  const body = await req.json();

  const nomeOriginal = body.nome;
  const nomeNormalizado = body.nome.toLowerCase();

  let nomeCategoria = "Outros";

  if (
    nomeNormalizado.includes("academia") ||
    nomeNormalizado.includes("gym") ||
    nomeNormalizado.includes("treino")
  ) {
    nomeCategoria = "Academia";
  } else if (
    nomeNormalizado.includes("uber") ||
    nomeNormalizado.includes("99") ||
    nomeNormalizado.includes("onibus") ||
    nomeNormalizado.includes("ônibus") ||
    nomeNormalizado.includes("bus")
  ) {
    nomeCategoria = "Transporte";
  } else if (
    nomeNormalizado.includes("ifood") ||
    nomeNormalizado.includes("mercado") ||
    nomeNormalizado.includes("lanche") ||
    nomeNormalizado.includes("restaurante") ||
    nomeNormalizado.includes("delivery") ||
    nomeNormalizado.includes("pizza") ||
    nomeNormalizado.includes("sushi")
  ) {
    nomeCategoria = "Alimentação";
  } else if (
    nomeNormalizado.includes("netflix") ||
    nomeNormalizado.includes("spotify") ||
    nomeNormalizado.includes("prime") ||
    nomeNormalizado.includes("hbo") ||
    nomeNormalizado.includes("max") ||
    nomeNormalizado.includes("disney") ||
    nomeNormalizado.includes("chatgpt") ||
    nomeNormalizado.includes("claude") ||
    nomeNormalizado.includes("gemini") ||
    nomeNormalizado.includes("grok") ||
    nomeNormalizado.includes("youtube") ||
    nomeNormalizado.includes("discord")
  ) {
    nomeCategoria = "Assinaturas";
  } else if (
    nomeNormalizado.includes("cinema") ||
    nomeNormalizado.includes("jogo") ||
    nomeNormalizado.includes("games") ||
    nomeNormalizado.includes("steam") ||
    nomeNormalizado.includes("playstation") ||
    nomeNormalizado.includes("psn") ||
    nomeNormalizado.includes("xbox") ||
    nomeNormalizado.includes("bar") ||
    nomeNormalizado.includes("cerveja") ||
    nomeNormalizado.includes("balada") ||
    nomeNormalizado.includes("festa") ||
    nomeNormalizado.includes("show") ||
    nomeNormalizado.includes("evento") ||
    nomeNormalizado.includes("ingresso") ||
    nomeNormalizado.includes("role") ||
    nomeNormalizado.includes("rolê")
  ) {
    nomeCategoria = "Lazer";
  } else if (
    nomeNormalizado.includes("shein") ||
    nomeNormalizado.includes("shopee") ||
    nomeNormalizado.includes("mercado livre") ||
    nomeNormalizado.includes("amazon") ||
    nomeNormalizado.includes("aliexpress") ||
    nomeNormalizado.includes("shopping")
  ) {
    nomeCategoria = "Compras";
  }

  const categoria = await prisma.categoria.findFirst({
    where: {
      nome: nomeCategoria,
    },
  });

  if (!categoria) {
    return Response.json(
      { error: `Categoria ${nomeCategoria} não encontrada` },
      { status: 400 },
    );
  }

  const gasto = await prisma.gasto.update({
    where: {
      id: body.id,
    },
    data: {
      nome: nomeOriginal,
      valor: Number(body.valor),
      categoriaId: categoria.id,
    },
    include: {
      categoria: true,
    },
  });

  return Response.json(gasto);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.gasto.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({ message: "Gasto removido com sucesso" });
}
