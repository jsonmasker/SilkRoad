using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddPriority : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Table_Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Table_QuestionLibraries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Priority",
                table: "Table_QuestionGroupLibraries",
                type: "int",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddColumn<byte>(
                name: "Priority",
                table: "Table_PredefinedAnswers",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<byte>(
                name: "Priority",
                table: "Table_PredefinedAnswerLibraries",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 24, 13, 37, 11, 870, DateTimeKind.Local).AddTicks(10));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 24, 13, 37, 11, 870, DateTimeKind.Local).AddTicks(1165));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 24, 13, 37, 11, 870, DateTimeKind.Local).AddTicks(1168));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 24, 13, 37, 11, 870, DateTimeKind.Local).AddTicks(1169));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 24, 13, 37, 11, 870, DateTimeKind.Local).AddTicks(1170));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Table_Questions");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Table_QuestionLibraries");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Table_PredefinedAnswers");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Table_PredefinedAnswerLibraries");

            migrationBuilder.AlterColumn<byte>(
                name: "Priority",
                table: "Table_QuestionGroupLibraries",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 23, 9, 14, 57, 963, DateTimeKind.Local).AddTicks(7644));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 23, 9, 14, 57, 963, DateTimeKind.Local).AddTicks(9027));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 23, 9, 14, 57, 963, DateTimeKind.Local).AddTicks(9034));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 23, 9, 14, 57, 963, DateTimeKind.Local).AddTicks(9035));

            migrationBuilder.UpdateData(
                table: "Table_QuestionTypes",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 23, 9, 14, 57, 963, DateTimeKind.Local).AddTicks(9036));
        }
    }
}
