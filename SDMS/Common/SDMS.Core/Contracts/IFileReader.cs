using SDMS.Core.DTO;
namespace SDMS.Core.Contracts;

public interface IStudentDataReader
{
    List<StudentDto> ReadStudentData(string filePath);
}
