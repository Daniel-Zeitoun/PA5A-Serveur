/* AJOUT DES ROLES */
-- Role de l'Admin
INSERT INTO "Roles" ("type", "createdAt", "updatedAt") VALUES ('Admin', now(), now());
-- Role pour un utilisateur qui ne peut que consulter le site (si on en créer un plus tard)
INSERT INTO "Roles" ("type", "createdAt", "updatedAt") VALUES ('Viewer', now(), now());
-- Role pour un Bot
INSERT INTO "Roles" ("type", "createdAt", "updatedAt") VALUES ('Bot', now(), now());


/* AJOUT DES UTILISATEURS */
-- Les mots de passe seront à changer par des hashs SHA256

INSERT INTO "Users" ("username", "password", "lastLogin", "roleId", "createdAt", "updatedAt")
VALUES ('dams', '01250041e7879922ed151be3e152b2e4725e2d1e7fbe2e61d19dadea48a49cf1', now(), (SELECT id FROM "Roles" WHERE type='Admin'), now(), now());

INSERT INTO "Users" ("username", "password", "lastLogin", "roleId", "createdAt", "updatedAt")
VALUES ('dany', '01250041e7879922ed151be3e152b2e4725e2d1e7fbe2e61d19dadea48a49cf1', now(), (SELECT id FROM "Roles" WHERE type='Admin'), now(), now());

INSERT INTO "Users" ("username", "password", "lastLogin", "roleId", "createdAt", "updatedAt")
VALUES ('sam', '01250041e7879922ed151be3e152b2e4725e2d1e7fbe2e61d19dadea48a49cf1', now(), (SELECT id FROM "Roles" WHERE type='Admin'), now(), now());

INSERT INTO "Users" ("username", "password", "lastLogin", "roleId", "createdAt", "updatedAt")
VALUES ('bot', '138223db4efd5a88b209da45bd55b4fe4822e4e5b3b691bb33f7a07be6420c0b', now(), (SELECT id FROM "Roles" WHERE type='Bot'), now(), now());
