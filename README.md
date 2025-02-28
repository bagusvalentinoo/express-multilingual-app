# Express Multilingual APP

## 📝 Description

Express Multilingual APP is a robust backend application built with Bun , Express.js , and TypeScript . It supports multilingual validation messages using Zod for schema validation and i18next for localization.

---

## 🌐 Demo

You can try the live demo here:

---

## ✨ Key Features

- Multilingual Support : Localization with i18next for dynamic language switching.
- Validation : Schema validation using Zod with customizable error messages.
- Type Safety : Fully typed with TypeScript for better developer experience.
- Performance : Optimized with Bun.js for faster execution.

---

## 🛠️ Technologies Used

- <a href="https://bun.sh/">Bun.js</a>
- <a href="https://expressjs.com/">Express.js</a>
- <a href="https://www.typescriptlang.org/">TypeScript</a>
- <a href="https://zod.dev/">Zod</a>
- <a href="https://www.i18next.com/">i18next</a>

---

## 🔧 Installation

### Local Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bagusvalentinoo/express-multilingual-app.git
   cd express-multilingual-app
   ```

2. **Configure environment variables:**

   - Copy the example `.env` file and update the values as needed:
     ```bash
     cp .env.example .env
     ```

3. **Install dependencies using Bun:**

   ```bash
   bun install
   ```

---

## 📚 Zod Schema Format

This project uses Zod for schema validation. Below is an explanation of how to define schemas and format multilingual error messages.

1. **Basic Schema Definition**

    Define your schema using Zod's built-in validators. For example:

    ```typescript
    import { z } from 'zod'

    const createUserSchema = z.object({
      name: z.string().min(1, { message: 'ns:validation,key:required,params:field=name' }),
      email: z.string().email({ message: 'ns:validation,key:email,params:field=email' }),
      age: z.number().min(18, { message: 'ns:validation,key:min,params:field=age,min=18' })
    })
    ```

2. **Error Message Format**

    Error messages in Zod are written in the following format:

    ```
    ns:{{namespace}},key:{{key}},params:{{params}}
    ```

    - `ns`: Namespace json file name. Make sure the json file is exists in the **./src/locales/{lng}/{ns}.json** directory, it's automatically detected what namespace are, don't need to initialize it on i18next. (e.g. `validation`, `errors`, `common`, etc.)
    - `key`: Key (e.g. `required`, `email`, `not_exists`, etc.) for single hierarchy, if you want to use multiple hierarchy, you can use dot notation (e.g. `http.400`, `auth.login_success`, `user.member.create`, etc.)
    - `params`: Parameters (e.g. `field=key1`, `productCode=123456`, etc.)

    For example:

    ```typescript
    z.string().min(1, { message: 'ns:validation,key:required,params:field=name' })
    ```

3. **Translation File Structure**

    The error messages are stored in translation files under the **./src/locales/{lng}/{ns}.json** directory. For example:


    **./src/locales/en/validation.json**
    ```
    src/locales/
    ├── en
    │ └── validation.json
    ```

    ```json
    {
      "required": "Oops, {{field}} cannot be empty",
      "min": "Oops, {{field}} must be at least {{min}} characters",
      "max": "Oops, {{field}} must be at most {{max}} characters",
      "email": "Oops, {{field}} must be a valid email address",
      "url": "Oops, {{field}} must be a valid URL",
      "number": "Oops, {{field}} must be a valid number",
      "array": "Oops, {{field}} must be an array",
      "object": "Oops, {{field}} must be an object",
      "boolean": "Oops, {{field}} must be a boolean",
      "date": "Oops, {{field}} must be a valid date",
      "datetime": "Oops, {{field}} must be a valid datetime",
      "enum": "Oops, {{field}} must be one of the following: {{values}}",
      "uuid": "Oops, {{field}} must be a valid UUID",
      "regex": "Oops, {{field}} must match the following regex: {{regex}}",
      "custom": "Oops, {{field}} is invalid",
      "unique": "Oops, {{field}} must be unique",
      "exists": "Oops, {{field}} does not exist",
      "notExists": "Oops, {{field}} already exists",
      "notEqual": "Oops, {{field}} must not be equal to {{value}}",
      "equal": "Oops, {{field}} must be equal to {{value}}",
      "notIn": "Oops, {{field}} must not be in the following: {{values}}",
      "in": "Oops, {{field}} must be in the following: {{values}}"
    }
    ```

    **./src/locales/id/validation.json**
    ```
    src/locales/
    ├── id
    │ └── validation.json
    ```

    ```json
    {
      "required": "Oops, {{field}} tidak boleh kosong",
      "min": "Oops, {{field}} harus memiliki minimal {{min}} karakter",
      "max": "Oops, {{field}} harus memiliki maksimal {{max}} karakter",
      "email": "Oops, {{field}} harus memiliki format email yang valid",
      "url": "Oops, {{field}} harus memiliki format URL yang valid",
      "number": "Oops, {{field}} harus memiliki format angka yang valid",
      "array": "Oops, {{field}} harus memiliki format array yang valid",
      "object": "Oops, {{field}} harus memiliki format object yang valid",
      "boolean": "Oops, {{field}} harus memiliki format boolean yang valid",
      "date": "Oops, {{field}} harus memiliki format tanggal yang valid",
      "datetime": "Oops, {{field}} harus memiliki format waktu yang valid",
      "enum": "Oops, {{field}} harus memiliki salah satu dari nilai berikut: {{values}}",
      "uuid": "Oops, {{field}} harus memiliki format UUID yang valid",
      "regex": "Oops, {{field}} harus memenuhi regex berikut: {{regex}}",
      "custom": "Oops, {{field}} tidak valid",
      "unique": "Oops, {{field}} harus unik",
      "exists": "Oops, {{field}} tidak ada",
      "notExists": "Oops, {{field}} sudah ada",
      "notEqual": "Oops, {{field}} tidak boleh sama dengan {{value}}",
      "equal": "Oops, {{field}} harus sama dengan {{value}}",
      "notIn": "Oops, {{field}} tidak boleh dalam daftar berikut: {{values}}",
      "in": "Oops, {{field}} harus dalam daftar berikut: {{values}}"
    }
    ```




---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 📞 Support

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/bagusvalentinoo/express-multilingual-app/issues) or contact the maintainers.

---

## 📚 Resources

- <a href="https://bun.sh/">Bun.js Documentation</a>
- <a href="https://expressjs.com/">Express.js Documentation</a>
- <a href="https://www.typescriptlang.org/">TypeScript Documentation</a>
- <a href="https://zod.dev/">Zod Documentation</a>
- <a href="https://www.i18next.com/">i18next Documentation</a>
