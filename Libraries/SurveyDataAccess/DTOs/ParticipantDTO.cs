namespace SurveyDataAccess.DTOs
{
    public class ParticipantDTO
    {
        public Guid Id { get; set; }
        public int SurveyFormId { get; set; }
        public SurveyFormDTO? SurveyForm { get; set; }
        public ICollection<AnswerDTO>? Answers { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CreatedBy { get; set; }
        public ICollection<ParticipantInfoDTO>? ParticipantInfos { get; set; }
    }
}
