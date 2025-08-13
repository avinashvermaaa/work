// using System.Collections.Generic;

namespace SDMS.Core.Contracts;
public interface IStudentService<T>
{
    void DisplayStudents(List<T> students);
    void SearchStudentByName(List<T> students, string name);
    void FilterByClass(List<T> students, string className);
    void CalculateAverageMarks(List<T> students, string subject);
    void SortStudentsByMarks(List<T> students, string subject, bool ascending);
    void CountStudentsByMarksRange(List<T> students);
    void GenerateReport(List<T> students, string filePath);
}
