-- Script is syntactically valid as-is.
-- Common runtime error if re-run without dropping: "There is already an object named 'Users' in the database."
-- Consider adding a default for CreatedAt and a unique constraint on Email if needed.

CREATE TABLE [dbo].[Users] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (100) NULL,
    [Email]     NVARCHAR (50)  NULL,
    [CreatedAt] DATETIME       NULL,
    CONSTRAINT [PK_NewTable] PRIMARY KEY CLUSTERED ([Id] ASC)
);

INSERT INTO [dbo].[Users](Name, Email) VALUES ('Oditha', 'oditha@example.com');
