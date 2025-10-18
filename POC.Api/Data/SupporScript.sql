--Adding users
USE [PosterrDb]
GO

INSERT INTO [dbo].[Users] ([Username])
VALUES
    ('TechGuru99'),
    ('CodeCrafter'),
    ('PixelWizard'),
    ('SkylineDev'),
    ('QuantumCoder'),
    ('EpicExplorer'),
    ('NeonNinja'),
    ('DigitalNomad'),
    ('CyberTrailblazer'),
    ('CloudChaser')
GO

USE [PosterrDb]
GO

-- Adding posts
INSERT INTO [dbo].[Posts]
           ([Content]
           ,[CreatedAt]
           ,[UserId]
           ,[RepostCount])
     VALUES
			('This is the first post!', GETDATE(), 1, 0),
			('Another example post', GETDATE(), 2, 0),
			('SQL with examples!', GETDATE(), 3, 0),
			('Sharing knowledge with the team', GETDATE(), 1, 0),
			('A repost-worthy post', GETDATE(), 4, 0),
			('Learning SQL is a great way to improve your database management skills.', GETDATE(), 5, 0),
			('Here is an example of a longer post with more detailed content: "SQL is a powerful language for interacting with relational databases. It allows you to create, read, update, and delete data in a structured and efficient manner."', GETDATE(), 6, 0),
			('Developing a habit of writing clean and efficient queries will significantly improve the performance of your applications.', GETDATE(), 3, 0),
			('Team collaboration is key! Share your ideas, insights, and expertise with others to foster innovation and growth.', GETDATE(), 2, 0),
			('This post demonstrates how to write an SQL INSERT statement: "INSERT INTO [TableName] ([Column1], [Column2]) VALUES ([Value1], [Value2]);". With this syntax, you can add data to your tables with ease.', GETDATE(), 7, 0),
			('Creating a user-friendly database schema involves carefully naming tables, columns, and constraints while ensuring normalization principles are followed.', GETDATE(), 1, 0),
			('A comprehensive guide to database optimization: "Start by analyzing your query plans, indexing frequently accessed columns, and avoiding unnecessary joins or subqueries. Always test your changes for performance impact."', GETDATE(), 8, 0),
			('Longer post: "Database transactions are critical for ensuring data integrity. A transaction is a sequence of operations performed as a single logical unit of work. If any part of the transaction fails, the entire transaction is rolled back to maintain a consistent state."', GETDATE(), 4, 0),
			('Interesting SQL fact: "Did you know? The acronym SQL stands for Structured Query Language. It was first introduced in the 1970s and has since become the standard for relational database management systems."', GETDATE(), 2, 0),
			('When working with large datasets, consider using batch processing for inserts and updates to avoid memory and performance issues.', GETDATE(), 5, 0);
GO