using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using PersonalFinance.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.DAL.Configurations
{
    public class AssetTypeConfiguration : IEntityTypeConfiguration<AssetTypeDTO>
    {
        public void Configure(EntityTypeBuilder<AssetTypeDTO> builder)
        {
            builder.ToTable("AssetTypes");
            builder.HasKey(i => i.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(i => i.Name).HasMaxLength(255);
        }
    }
}
