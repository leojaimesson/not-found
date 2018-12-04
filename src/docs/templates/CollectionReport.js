export default (data) => ({
    content: [
        {
            text: `Coletas realizadas entre ${data.startDate} - ${data.endDate}\n\n`,
            style: 'header'
        },
        {
            text: `Total coletado: ${data.total.toFixed(2)} Kg`,
            fontSize: 14, bold: true
        },
        {
			style: 'table',
			table: {
                widths: [200, '*', 100],
				body: [
					['Tipo de resíduo coletado', 'Total coletado', 'Data'],
					...data.datas
				]
			}
		}
    ],

    styles: {
        header: {
            fontSize: 18,
            bold: true
        },
        table: {
			margin: [0, 5, 0, 15]
		},
    }
});