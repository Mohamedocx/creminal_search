using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CriminalSearchAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddNameAndCaseNumberToCriminal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CaseNumber",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaseNumber",
                table: "Criminals");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Criminals");
        }
    }
}
