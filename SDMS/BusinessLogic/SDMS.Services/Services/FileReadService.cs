// // using System.Collections.Generic;
// // using System.IO;
// using SDMS.Core.DTO;
// using SDMS.Core.Contracts;


// namespace SDMS.Services.Services;

//     public class FileReadFromCsv : IStudentDataReader
//     {
//         public List<StudentDto> ReadStudentData(string filePath)
//         {
//             var students = new List<StudentDto>();
//             var lines = File.ReadAllLines(filePath);

//             foreach (var line in lines.Skip(1))
//             {
//                 var parts = line.Split(',');

//                 students.Add(new StudentDto
//                 {
//                     Uid             =   parts[0],
//                     Name            =   parts[1],
//                     Class           =   parts[2],
//                     Section         =   parts[3],
//                     Physics         =   int.Parse(parts[4]),
//                     Chemistry       =   int.Parse(parts[5]),
//                     Mathematics     =   int.Parse(parts[6]),
//                     English         =   int.Parse(parts[7]),
//                     ComputerScience =   int.Parse(parts[8])

//                 });
//             }

//             return students;
//         }
//     }
