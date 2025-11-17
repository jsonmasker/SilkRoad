using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.Models
{
    public class QuestionLibraryFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int QuestionGroupId { get; set; }
        public int QuestionTypeId { get; set; }
        public string? SearchText { get; set; }
    }
}
