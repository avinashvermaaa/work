// using System.Collections.Generic;

namespace SDMS.Core.Contracts;

public interface IGenerateReport<T>
{
    void Export(List<T> students, string reportPath);
}
