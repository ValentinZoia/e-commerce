import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import { envs } from "../../../shared/infrastructure/adapters";

const token = envs.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-5-nano";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });
export class AIController {
  async generate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { prompt } = req.body;
      const products = await fetch(`${envs.SERVER_URL}/api/products?take=50`);
      const data = await products.json();
      console.log(data);
      const aiResponse = await client.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "Eres un asesor experto en e-commerce y ventas digitales con más de 10 años de experiencia en marketplaces, tiendas online y estrategias de conversión. Tu tarea es ayudar a aumentar ventas, mejorar experiencia de usuario y optimizar márgenes de ganancia. Responde siempre con lenguaje claro, accionable y adaptado a negocios minoristas en LATAM.",
          },
          {
            role: "user",
            content: `Analiza estos datos: ${JSON.stringify(data)}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      res.json({
        success: true,
        message: "Respuesta generada exitosamente",
        data: aiResponse.choices[0].message.content,
      });
    } catch (error) {
      next(error);
    }
  }
}
