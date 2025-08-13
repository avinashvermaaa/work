// using SDMS.Core.Contracts;
// using SDMS.Core.DTO;

// namespace SDMS.Services.Services;

//     public class TxtFileExport : IGenerateReport<StudentDto>
//     {
//         public void Export(List<StudentDto> students, string reportPath)
//         {
//             using (var writer = new StreamWriter(reportPath))
//             {
//                 foreach (var student in students)
//                 {
//                     writer.WriteLine(new string('-', 40));
//                     writer.WriteLine($"Uid              : {student.Uid}");
//                     writer.WriteLine($"Name             : {student.Name}");
//                     writer.WriteLine($"Class            : {student.Class}");
//                     writer.WriteLine($"Section          : {student.Section}");
//                     writer.WriteLine($"Total Marks      : {student.TotalMarks}");
//                     writer.WriteLine($"Average Marks    : {student.AverageMarks}");
//                 }
//             }

//             Console.WriteLine($"Txt Report generated successfully with FileName: {reportPath}");
//         }
//     }


//     public class CsvFileExport : IGenerateReport<StudentDto>
//     {
//         public void Export(List<StudentDto> students, string reportPath)
//         {
//             using (var writer = new StreamWriter(reportPath))
//             {
//                 writer.WriteLine("Uid,Name,Class,Section,TotalMarks,AverageMarks");
//                 foreach (var student in students)
//                 {
//                     writer.WriteLine($"{student.Uid},{student.Name},{student.Class},{student.Section},{student.TotalMarks},{student.AverageMarks}");
//                 }
//             }

//             Console.WriteLine($"CSV Report generated successfully with FileName: {reportPath}");
//         }
//     }