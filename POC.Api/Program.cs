using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Posterr.Api.Data;
using System;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();

//CORS Config | Allow communication between different domains
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy => policy.WithOrigins("http://localhost:3000") // React Application URL
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

//Configure ports
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);  // HTTP
    //options.ListenAnyIP(5001, listenOptions =>
    //{
    //    listenOptions.UseHttps();  // HTTPS
    //});
});


//Swagger documentation
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Posterr API",
        Description = "This API provides data and operations on them from a Social Media Network",
    });

    //Triggers documentation via Swashbuckle
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection'" +
    " not found.")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// Apply CORS Policy
app.UseCors("AllowLocalhost");

app.MapControllers();
app.Run();

