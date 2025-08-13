
using SDMS.Core.Constants;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

app.MapGet("0", (int choosedOption  = 0) =>
{
    if (Enum.IsDefined(typeof(MenuOption), choosedOption))
    {
        MenuOption option = (MenuOption)choosedOption;
        return $"Selected menu option: {option}";
    }
    return "";
});

app.MapGet("1", (int choosedOption  = 1) =>
{
    if (Enum.IsDefined(typeof(MenuOption), choosedOption))
    {
        MenuOption option = (MenuOption)choosedOption;
        Console.WriteLine($"{option}");
        return $"Selected menu option: {option}";
    }
    return "";
}); 

app.MapGet("2", (int choosedOption  = 2) =>
{
    if (Enum.IsDefined(typeof(MenuOption), choosedOption))
    {
        MenuOption option = (MenuOption)choosedOption;
        Console.WriteLine($"{option}");
        return $"Selected menu option: {option}";
    }
    return "";
});

app.UseHttpsRedirection();

app.Run();