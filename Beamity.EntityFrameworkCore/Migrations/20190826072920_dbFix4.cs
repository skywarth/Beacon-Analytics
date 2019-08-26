using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Beamity.EntityFrameworkCore.Migrations
{
    public partial class dbFix4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Beacons_Locations_LocationId",
                table: "Beacons");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Beacons_BeaconId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_BeaconId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "BeaconId",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "Beacons",
                newName: "ArtifactId");

            migrationBuilder.RenameIndex(
                name: "IX_Beacons_LocationId",
                table: "Beacons",
                newName: "IX_Beacons_ArtifactId");

            migrationBuilder.AddColumn<Guid>(
                name: "BeaconActivityId",
                table: "Relations",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Beacons_Artifacts_ArtifactId",
                table: "Beacons",
                column: "ArtifactId",
                principalTable: "Artifacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Beacons_Artifacts_ArtifactId",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "BeaconActivityId",
                table: "Relations");

            migrationBuilder.RenameColumn(
                name: "ArtifactId",
                table: "Beacons",
                newName: "LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Beacons_ArtifactId",
                table: "Beacons",
                newName: "IX_Beacons_LocationId");

            migrationBuilder.AddColumn<Guid>(
                name: "BeaconId",
                table: "Rooms",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_BeaconId",
                table: "Rooms",
                column: "BeaconId");

            migrationBuilder.AddForeignKey(
                name: "FK_Beacons_Locations_LocationId",
                table: "Beacons",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Beacons_BeaconId",
                table: "Rooms",
                column: "BeaconId",
                principalTable: "Beacons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
