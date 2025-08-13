namespace SDMS.Core.DTO;
public class StudentDto
{
    public required string  Uid { get; set; }
    public required string Name { get; set; }
    public required string Class { get; set; }
    public required string Section { get; set; }
    public int Physics { get; set; }
    public int Chemistry { get; set; }
    public int Mathematics { get; set; }
    public int English { get; set; }
    public int ComputerScience { get; set; }

    public int TotalMarks => Physics + Chemistry + Mathematics + English + ComputerScience;
    public double AverageMarks => TotalMarks / 5.0;
}