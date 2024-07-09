import { useState, useEffect } from "react";
import { Container } from "./styles";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { toast } from "react-toastify";

import { api } from "../../services/api";

import logo from "../../assets/icons/logo.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignInUp({ mode }) {
  const { signIn } = useAuth();

  const [authMode, setAuthMode] = useState(mode === "signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // Estado para controlar o redirecionamento

  useEffect(() => {
    setAuthMode(mode === "signup");
  }, [mode]);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSignIn() {
    signIn({ email, password });
  }

  function handleSignUp() {
    if (!name || !email || !password) {
      return toast.warn("Preencha todos os campos!");
    }

    if (!validateEmail(email)) {
      toast.warn("Por favor, insira um email válido.");
      return;
    }

    api
      .post("/users", { name, email, password })
      .then(() => {
        toast.success("Usuário cadastrado com sucesso");
        setRedirect(true); // Atualiza o estado para redirecionar
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Não foi possível cadastrar");
        }
      });
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      authMode ? handleSignUp() : handleSignIn();
    }
  };

  // Redirecionamento condicional
  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <AnimatePresence wait>
      <Container>
        <img className="logo" src={logo} alt="Logo Food Explorer" />
        <motion.div
          className="auto"
          key={authMode ? "createAccount" : "signIn"}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -100 },
          }}
          transition={{ duration: 0.5 }}
        >
          <main className="wrapper">
            <h1>{authMode ? "Crie sua conta" : "Faça login"}</h1>

            {authMode && (
              <Input
                type="text"
                name="Nome"
                placeholder="Maria Listvan"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            )}
            <Input
              type="email"
              name="Email"
              placeholder="email@exemplo.com.br"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="password"
              name="Senha"
              placeholder="No mínimo 6 caracteres"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              name={authMode ? "Criar conta" : "Entrar"}
              onClick={authMode ? handleSignUp : handleSignIn}
            />
            <Link to={authMode ? "/" : "/signup"}>
              {authMode ? "Já tenho uma conta" : "Criar uma conta"}
            </Link>
          </main>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
}
