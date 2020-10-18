# Recuperação de senha

**Requisitos funcionais**

- O usuário deve poder recuperar a senha usando email
- O usuário deve receber um email com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**Requisitos não funcionais**

- Utilizar o Mailtrap para envio de emails em desenvolvimento
- Utilizar Amazon SES para envio em produção
- O envio de email deve ocorrer em segundo plano (bg)


**Regras de negócio**

- O link enviado pelo email deve expirar em 2 horas
- O usuário precisa confirmar a nova senha durante recuperação


# Atualização de Perfil

**RF**

- O usuário deve poder alterar email, nome e senha


**RN**

- O usuário não pode utilizar email já cadastrado
- O usuário precisa confirmar sua senha durante antes da alteração
- O usuário precisa confirmar a nova senha durante alteração


# Painel do prestador


**Requisitos funcionais**

- O usuário deve poder listar os agendamentos de um dia específico
- O prestador deve receber notificação sempre que houver novo agendamento
- O prestador deve poder visualizar notificações não lidas


**Requisitos não funcionais**

- Os agendamentos do dia deve ser armazenada em cache
- As notificações devem ser armazenadas no MongoDB
- As notificanções devem ser enviadas em tempo real usando Socket.IO

**Regras de negócio**

- A notificação deve ter status de lida ou não



# agendamento de serviços

**Requisitos funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados
- O usuário deve poder listar os horarios disponíveis de um prestador no mês
- O usuário deve poder listar os horarios disponíveis de um prestador num dia específico
- O usuário deve poder agendar com um prestador

**Requisitos não funcionais**

- A listagem de agendamentos deve ser armazenada em cache

**Regras de negócio**

- Cada agendamento deve durar 1 hora
- Os agendamentos são das 08:00 as 18:00
- Os agendamentos não podem ser no mesmo horário
- Os agendamentos não podem ser em horário passado
- Os usuário não podem usar serviço consigo mesmo
