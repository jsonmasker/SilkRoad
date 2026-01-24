using System;
using System.Share.Models;
using ChatBot.Models;

namespace ChatBot.IServices;

public interface IConversationService
{
        Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter);
        Task<ConversationModel> GetByIdAsync(Guid Id);
        Task CreateAsync(ConversationModel entity);
}
