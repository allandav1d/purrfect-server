export const defaultSettings = [
  {
    key: "server_ipv4",
    value:  null,
    description: "Endereço IPv4 do servidor",
    type: "string" as const,
    isSystem: true,
  },
  {
    key: "server_ipv6",
    value: null,
    description: "Endereço IPv6 do servidor",
    type: "string" as const,
    isSystem: true,
  },
  {
    key: "main_domain",
    value: null,
    description: "Domínio principal do servidor",
    type: "string" as const,
    isSystem: true,
  },
  {
    key: "language",
    value: "pt-BR",
    description: "Idioma padrão do sistema",
    type: "string" as const,
    isSystem: true,
  },
  {
    key: "server_name",
    value: "Purrfect Server",
    description: "Nome do servidor",
    type: "string" as const,
    isSystem: true,
  },
  {
    key: "timezone",
    value: "America/Sao_Paulo",
    description: "Timezone do servidor",
    type: "string" as const,
    isSystem: true,
  },
] as const; 