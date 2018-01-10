<xsl:stylesheet version="1.0" indent="yes" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="text" encoding="utf-8"/>

	<xsl:template match="/">
		<xsl:apply-templates select="svg"/>
	</xsl:template>

	<xsl:template match="svg">

		<xsl:text>{"url":"</xsl:text>
		<xsl:value-of select="@url"/>
		<xsl:text>",</xsl:text>

		<xsl:text>"content":[</xsl:text>
			<xsl:for-each select="*">
				<xsl:text>&#10;</xsl:text>
				<xsl:call-template name="shape"/>

				<xsl:if test="position() != last()">
					<xsl:text>,</xsl:text>
				</xsl:if>

			</xsl:for-each>

		<xsl:text>]}</xsl:text>
	</xsl:template>

	<xsl:template name="shape">

		<xsl:text>{"shape":"</xsl:text>
		<xsl:value-of select="name(.)"/>
		<xsl:text>","parameters":[</xsl:text>

			<xsl:for-each select="@*">
				<xsl:text>&#10;</xsl:text>
				<xsl:text>{"color":"</xsl:text>
				<xsl:value-of select="name(.)"/>

				<xsl:if test="position() != last()">
					<xsl:text>"},</xsl:text>
				</xsl:if>

				<xsl:if test="position() = last()">
					<xsl:text>"}</xsl:text>
				</xsl:if>
			</xsl:for-each>
		<xsl:text>]</xsl:text>
		<xsl:text>}</xsl:text>

	</xsl:template>

</xsl:stylesheet>
