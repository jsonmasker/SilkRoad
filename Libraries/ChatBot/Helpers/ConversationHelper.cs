using System;
using System.Share.Models;
using ChatBot.IHelpers;
using ChatBot.IServices;
using ChatBot.Models;

namespace ChatBot.Helpers;

public class ConversationHelper : IConversationHelper
{
    private readonly IConversationService _conversationService;

    public ConversationHelper(IConversationService conversationService)
    {
        _conversationService = conversationService;
    }
    public Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter)
    {
        if (filter == null)
            throw new ArgumentNullException(nameof(filter));
        return _conversationService.GetAllAsync(filter);
    }
}
