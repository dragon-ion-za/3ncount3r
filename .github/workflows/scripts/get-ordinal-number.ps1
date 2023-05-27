Function Get-OrdinalNumber {
    Param(
        [Parameter(Mandatory=$true)]
        [int64]$num
    )

    $Suffix = Switch -regex ($Num) {
        '1(1|2|3)$' { 'th'; break }
        '.?1$'      { 'st'; break }
        '.?2$'      { 'nd'; break }
        '.?3$'      { 'rd'; break }
        default     { 'th'; break }
    }
    Write-Output "$Num$Suffix"
}