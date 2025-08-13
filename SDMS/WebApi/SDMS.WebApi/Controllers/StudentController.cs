using Microsoft.AspNetCore.Mvc;

namespace SDMS.WebApi.Controllers;

public class StudentController : Controller
{
    private readonly ILogger<StudentController> _logger;


    public StudentController(ILogger<StudentController> logger)
    {
        _logger = logger;
    }

    public string Index()
    {
        return "Student -> Index ";
    }
}