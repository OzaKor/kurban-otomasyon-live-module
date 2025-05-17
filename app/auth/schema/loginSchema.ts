import * as z from "zod";

const LoginSchema = z.object({
    email: z.string().email({
        message: "Geçerli bir e-posta adresi giriniz.",
    }),
    password: z.string().min(6, {
        message: "Şifre en az 6 karakter olmalıdır.",
    }),
});

export default LoginSchema;
