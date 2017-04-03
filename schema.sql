CREATE TABLE public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "firstName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "roleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email),
    CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId")
        REFERENCES public."Roles" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE public."Roles"
(
    id integer NOT NULL DEFAULT nextval('"Roles_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY (id),
    CONSTRAINT "Roles_title_key" UNIQUE (title)
)

CREATE TABLE public."Documents"
(
    id integer NOT NULL DEFAULT nextval('"Documents_id_seq"'::regclass),
    "userId" integer NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "docContent" text COLLATE pg_catalog."default" NOT NULL,
    access "enum_Documents_access" DEFAULT 'public'::"enum_Documents_access",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Documents_pkey" PRIMARY KEY (id),
    CONSTRAINT "Documents_title_key" UNIQUE (title),
    CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE public."Priviledges"
(
    id integer NOT NULL DEFAULT nextval('"Priviledges_id_seq"'::regclass),
    "docId" integer,
    "canEdit" boolean DEFAULT false,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'none@email.com'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Priviledges_pkey" PRIMARY KEY (id),
    CONSTRAINT "Priviledges_docId_fkey" FOREIGN KEY ("docId")
        REFERENCES public."Documents" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
