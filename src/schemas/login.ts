import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório.")
    .email("Por favor, insira um e-mail válido."),
  password: z
    .string()
    .nonempty("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type FormData = z.infer<typeof schema>;
