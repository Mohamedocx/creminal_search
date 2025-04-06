using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CriminalSearchAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCriminalSchema2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ArrivalTime",
                table: "Criminals",
                newName: "Name");

            migrationBuilder.AddColumn<DateTime>(
                name: "ArrivalDateTime",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivalDateTime",
                table: "Criminals");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Criminals",
                newName: "ArrivalTime");
        }
    }
}
