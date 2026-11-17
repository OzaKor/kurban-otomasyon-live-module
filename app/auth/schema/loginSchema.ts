import * as z from "zod";

const LoginSchema = z.object({
  email: z.email({
    error: "Geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(6, {
    error: "Şifre en az 6 karakter olmalıdır.",
  }),
});

export default LoginSchema;
