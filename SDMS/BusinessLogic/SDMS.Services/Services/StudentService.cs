// // using System;
// // using System.Collections.Generic;
// // using System.IO;
// // using System.Linq;
// using SDMS.Core.DTO;
// using SDMS.Core.Contracts;

// namespace SDMS.Services.Services;

//     public class StudentService : IStudentService<StudentDto>
//     {
//         public void DisplayStudents(List<StudentDto> students)
//         {
//             Console.WriteLine($"{"Uid",-8} {"Name",-15} {"Class",-6} {"Section",-8} {"Physics",-8} {"Chemistry",-10} {"Mathematics",-12} {"English",-10} {"ComputerScience",-18} {"TotalMarks",-6}");
//             foreach (var student in students)
//             {
//                 Console.WriteLine($"{student.Uid,-8} {student.Name,-15} {student.Class,-6} {student.Section,-8} {student.Physics,-8} {student.Chemistry,-10} {student.Mathematics,-12} {student.English,-10} {student.ComputerScience,-18} {student.TotalMarks,-6}");
//             }
//         }

//         public void SearchStudentByName(List<StudentDto> students, string name)
//         {
//             var StudentFound = students
//                 .Where(student => student.Name.Contains(name, StringComparison.OrdinalIgnoreCase))
//                 .ToList();

//             DisplayStudents(StudentFound);
//         }

//         public void FilterByClass(List<StudentDto> students, string className)
//         {
//             var FilteredClass = students
//                 .Where(student => string.Equals(student.Class, className, StringComparison.OrdinalIgnoreCase))
//                 .ToList();

//             DisplayStudents(FilteredClass);
//         }

//         public void CalculateAverageMarks(List<StudentDto> students, string? subject = null)
//         {
//             double average = 0;

//             if (string.IsNullOrWhiteSpace(subject))
//             {
//                 average = students.Average(student => student.AverageMarks);
//             }
//             else
//             {
//                 switch (subject.Trim().ToLower())
//                 {
//                     case "physics":
//                         average = students.Average(student => student.Physics); break;
//                     case "chemistry":
//                         average = students.Average(student => student.Chemistry); break;
//                     case "mathematics":
//                         average = students.Average(student => student.Mathematics); break;
//                     case "english":
//                         average = students.Average(student => student.English); break;
//                     case "computerscience":
//                         average = students.Average(student => student.ComputerScience); break;
//                     default:
//                         Console.WriteLine("Invalid subject name.");
//                         return;
//                 }
//             }

//             Console.WriteLine($"Average marks{(string.IsNullOrEmpty(subject) ? "" : $" in {subject}")}: {average:F2}");
//         }

//         public void SortStudentsByMarks(List<StudentDto> students, string subject, bool ascending)
//         {
//             Func<StudentDto, int> selector = subject.ToLower() switch
//             {
//                 "physics" => student => student.Physics,
//                 "chemistry" => student => student.Chemistry,
//                 "mathematics" => student => student.Mathematics,
//                 "english" => student => student.English,
//                 "computerscience" => student => student.ComputerScience,
//                 _ => student => student.TotalMarks
//             };

//             var sorted = ascending
//                 ? students.OrderBy(selector).ToList()
//                 : students.OrderByDescending(selector).ToList();

//             DisplayStudents(sorted);
//         }

//         public void CountStudentsByMarksRange(List<StudentDto> students)
//         {
//             string[] subjects = {"Physics", "Chemistry", "Mathematics", "English", "ComputerScience"};
//             var ranges = new Dictionary<string, (int Min, int Max)>
//             {
//                 { "0-50", (0, 50) },
//                 { "51-70", (51, 70) },
//                 { "71-90", (71, 90) },
//                 { "91-100", (91, 100) }
//             };

//             foreach (var subject in subjects)
//             {
//                 Console.WriteLine($"\nRange distribution for {subject}:");
//                 foreach (var range in ranges)
//                 {
//                     var count = students.Count(s => 
//                     {
//                         int mark = subject switch
//                         {
//                             "Physics" => s.Physics,
//                             "Chemistry" => s.Chemistry,
//                             "Mathematics" => s.Mathematics,
//                             "English" => s.English,
//                             "ComputerScience" => s.ComputerScience,
//                             _ => 0
//                         };
//                         return (mark >= range.Value.Min) && (mark <= range.Value.Max);
//                     });
//                     Console.WriteLine($"{range.Key}: {count} student(s)");
//                 }
//             }
//         }

//         public void GenerateReport(List<StudentDto> students, string filePath)
//         {
//             IGenerateReport<StudentDto> reportGenerator;

//             if (filePath.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
//             {
//                 reportGenerator = new TxtFileExport();
//             }
//             else if (filePath.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
//             {
//                 reportGenerator = new CsvFileExport();
//             }
//             else
//             {
//                 Console.WriteLine("Unsupported report format Use (.txt Or .csv)");
//                 return;
//             }

//             reportGenerator.Export(students, filePath);
//         }
//     }
