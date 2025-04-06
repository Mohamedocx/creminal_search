using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CriminalSearchAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Criminals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NationalId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tribe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonalDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpecialFeatures = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PermanentResidence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsualPlaces = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CrimeType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CrimeLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Criminals", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Criminals");
        }
    }
}
