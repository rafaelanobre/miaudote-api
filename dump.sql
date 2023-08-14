--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: pets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pets (
    id integer NOT NULL,
    "ownerId" integer NOT NULL,
    "registeredAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    "categoryId" integer NOT NULL,
    description text NOT NULL,
    characteristics text NOT NULL,
    photo text NOT NULL,
    available boolean NOT NULL,
    "zipCode" character varying(8) NOT NULL,
    city text NOT NULL,
    state text NOT NULL
);


--
-- Name: pets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pets_id_seq OWNED BY public.pets.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    cpf character varying(11) NOT NULL,
    cellphone character varying(11) NOT NULL,
    password text NOT NULL,
    photo text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: pets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets ALTER COLUMN id SET DEFAULT nextval('public.pets_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Cachorro');
INSERT INTO public.categories VALUES (2, 'Gato');


--
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pets VALUES (3, 2, '2023-08-12 14:53:38.463195', 'Caramelito', 1, 'Resgatado das ruas de Porto Alegre, um cachorro muito feliz e comilão procurando sua próxima família', 'Macho, vacinado e morto de fome. Gosta de dormir no sofá e convive bem com pessoas e outros animais.', 'https://t1.ea.ltmcdn.com/pt/razas/5/3/7/vira-lata-caramelo_735_0_orig.jpg', true, '90040000', 'Porto Alegre', 'RS');
INSERT INTO public.pets VALUES (1, 2, '2023-08-11 21:38:51.455278', 'Ramelinho', 1, 'sou fofoqueiro e gosto de latir pra vizinhas', 'amo biscoitos', 'https://www.mundoecologia.com.br/wp-content/uploads/2019/10/A-Rac%CC%A7a-Chihuahua.png', false, '31630900', 'Belo Horizonte', 'MG');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'Rafaela', 'rafaela@miaudote.com', '12345678901', '99981020218', '$2b$10$n1tYEkcUx6VznzoDxYQkUuqBn6FLFSvJPknPKTnFzVZgODk6NWB9.', 'https://www.pngitem.com/pimgs/m/579-5798505_user-placeholder-svg-hd-png-download.png');
INSERT INTO public.users VALUES (3, 'Marina', 'marina@miaudote.com', '84615328465', '46523658856', '$2b$10$wMjwIrdY0K6IG9JyBX83aeexyILMGKyzNQR1axdxjS/6C7OSgVGk.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXP1taARF2obxe0_eECJ8tVs9NEsoRoHhiQ&usqp=CAU');


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- Name: pets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pets_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY (id);


--
-- Name: users users_cpf_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_cpf_key UNIQUE (cpf);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: pets pets_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT "pets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id);


--
-- Name: pets pets_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT "pets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

