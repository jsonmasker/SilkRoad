using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSurveyForm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormStyleId",
                table: "Table_SurveyForms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsLimited",
                table: "Table_SurveyForms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaxParticipants",
                table: "Table_SurveyForms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 9, 8, 41, 33, 907, DateTimeKind.Local).AddTicks(1562));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 9, 8, 41, 33, 907, DateTimeKind.Local).AddTicks(2667));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 9, 8, 41, 33, 907, DateTimeKind.Local).AddTicks(2671));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 9, 8, 41, 33, 907, DateTimeKind.Local).AddTicks(2672));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 9, 8, 41, 33, 907, DateTimeKind.Local).AddTicks(2673));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FormStyleId",
                table: "Table_SurveyForms");

            migrationBuilder.DropColumn(
                name: "IsLimited",
                table: "Table_SurveyForms");

            migrationBuilder.DropColumn(
                name: "MaxParticipants",
                table: "Table_SurveyForms");

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 10, 6, 15, 28, 15, 396, DateTimeKind.Local).AddTicks(8655));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 10, 6, 15, 28, 15, 396, DateTimeKind.Local).AddTicks(9778));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 10, 6, 15, 28, 15, 396, DateTimeKind.Local).AddTicks(9782));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 10, 6, 15, 28, 15, 396, DateTimeKind.Local).AddTicks(9783));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 10, 6, 15, 28, 15, 396, DateTimeKind.Local).AddTicks(9784));
        }
    }
}
