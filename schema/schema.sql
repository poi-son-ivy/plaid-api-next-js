DROP TABLE IF EXISTS public.countries;
CREATE TABLE IF NOT EXISTS public.countries
(
    country_id integer NOT NULL DEFAULT nextval('countries_country_id_seq'::regclass),
    country_name text COLLATE pg_catalog."default" NOT NULL,
    country_short_code text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT countries_pkey PRIMARY KEY (country_id)
)

TABLESPACE pg_default;

DROP TABLE IF EXISTS public.crypto_definition;
CREATE TABLE IF NOT EXISTS public.crypto_definition
(
    crypto_id integer NOT NULL DEFAULT nextval('crypto_definition_crypto_id_seq'::regclass),
    crypto_name text COLLATE pg_catalog."default" NOT NULL,
    crypto_chain text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT crypto_definition_pkey PRIMARY KEY (crypto_id)
)

TABLESPACE pg_default;

DROP TABLE IF EXISTS public.users;
CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    user_name text COLLATE pg_catalog."default" NOT NULL,
    user_country_id integer NOT NULL,
    user_credentials text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT fk_user_country FOREIGN KEY (user_country_id)
        REFERENCES public.countries (country_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

DROP TABLE IF EXISTS public.user_crypto;
CREATE TABLE IF NOT EXISTS public.user_crypto
(
    user_crypto_id integer NOT NULL DEFAULT nextval('user_crypto_user_crypto_id_seq'::regclass),
    user_id integer NOT NULL,
    crypto_id integer NOT NULL,
    CONSTRAINT user_crypto_pkey PRIMARY KEY (user_crypto_id),
    CONSTRAINT fk_usercrypto_cryptoid FOREIGN KEY (crypto_id)
        REFERENCES public.crypto_definition (crypto_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_usercrypto_userid FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;


