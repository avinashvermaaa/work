# Routing
1. Convetion based -> file method based routing.
2. Attribute based -> created method based (best for SEO and better control at endpoints.)

## Routing Constraints :-
##### int, datetime, decimal, bool, guid, length(min,max), alpha, range(min,max)
```
Guid newguid = Guid.NewGuid();
Console.WriteLine(newguid);
Console.WriteLine(newguid.ToString("D").Length); // length 
Console.WriteLine(newguid.ToString("D")); // Default
Console.WriteLine(newguid.ToString("N")); // no hyphens
Console.WriteLine(newguid.ToString("B")); // with Braces
Console.WriteLine(newguid.ToString("P")); // with paren.

string guidString = newguid.ToString("N");
    Console.WriteLine(guidString.GetType() == typeof(string));
    Console.WriteLine(typeof(int));

```

```
using System.ComponentModel.DataAnnotations;

public class Product
{
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Error Message")]
    public string Name { get; set; }

    [Range(0.01, 1000.00, ErrorMessage = "Price must be between 0.01 and 1000.00")]
    public decimal Price { get; set; }

    [Range(1, 100, ErrorMessage = "Stock quantity must be between 1 and 100")]
    public int StockQuantity { get; set; }
}
```