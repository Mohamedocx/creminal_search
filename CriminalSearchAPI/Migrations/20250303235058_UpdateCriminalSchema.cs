using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CriminalSearchAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCriminalSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrestOrder",
                table: "Criminals");

            migrationBuilder.AddColumn<bool>(
                name: "HasOfficialArrestOrder",
                table: "Criminals",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasOfficialArrestOrder",
                table: "Criminals");

            migrationBuilder.AddColumn<string>(
                name: "ArrestOrder",
                table: "Criminals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
