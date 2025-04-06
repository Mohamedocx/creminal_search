using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CriminalSearchAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCriminalSchema3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "HasOfficialArrestOrder",
                table: "Criminals");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Criminals",
                newName: "UsualPlaces");

            migrationBuilder.RenameColumn(
                name: "CaseNumber",
                table: "Criminals",
                newName: "SpecialFeatures");

            migrationBuilder.RenameColumn(
                name: "ArrivalDateTime",
                table: "Criminals",
                newName: "PersonalDescription");

            migrationBuilder.RenameColumn(
                name: "ArrestedBy",
                table: "Criminals",
                newName: "PermanentResidence");

            migrationBuilder.AddColumn<string>(
                name: "BirthPlace",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CrimeLocation",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CrimeType",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "NationalId",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Nationality",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthPlace",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "CrimeLocation",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "CrimeType",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "NationalId",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "Nationality",
                table: "Criminals");

            migrationBuilder.RenameColumn(
                name: "UsualPlaces",
                table: "Criminals",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "SpecialFeatures",
                table: "Criminals",
                newName: "CaseNumber");

            migrationBuilder.RenameColumn(
                name: "PersonalDescription",
                table: "Criminals",
                newName: "ArrivalDateTime");

            migrationBuilder.RenameColumn(
                name: "PermanentResidence",
                table: "Criminals",
                newName: "ArrestedBy");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Criminals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "HasOfficialArrestOrder",
                table: "Criminals",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
