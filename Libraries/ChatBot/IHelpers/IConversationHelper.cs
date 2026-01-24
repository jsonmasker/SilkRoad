using System;
using System.Share.Models;
using ChatBot.Models;

namespace ChatBot.IHelpers;

public interface IConversationHelper
{
        Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter);
}
