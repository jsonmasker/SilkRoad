using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.DAL.Configurations
{
    public class TradeHistoryConfiguration : IEntityTypeConfiguration<TradeHistoryDTO>
    {
        public void Configure(EntityTypeBuilder<TradeHistoryDTO> builder)
        {
            builder.ToTable("TradeHistories");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
