import { styled } from "@stitches/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import React, { useEffect, useRef, useState } from "react";
import mammoth from "mammoth";
import PDFMerger from "pdf-merger-js/browser";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const html2pdfmakeStyles = {
  tableAutoSize: true,
  defaultStyles: {
    b: { bold: true },
    strong: { bold: true },
    u: { decoration: "underline" },
    s: { decoration: "lineThrough" },
    em: { italics: true },
    i: { italics: true },
    h1: { fontSize: 24, bold: true, marginBottom: 5 },
    h2: { fontSize: 22, bold: true, marginBottom: 5 },
    h3: { fontSize: 20, bold: true, marginBottom: 5 },
    h4: { fontSize: 18, bold: true, marginBottom: 5 },
    h5: { fontSize: 16, bold: true, marginBottom: 5 },
    h6: { fontSize: 14, bold: true, marginBottom: 5 },
    a: { color: "blue", decoration: "underline" },
    strike: { decoration: "lineThrough" },
    p: { margin: [0, 3, 0, 3] },
    ul: { marginBottom: 5 },
    li: { marginLeft: 5 },
    table: { marginBottom: 5 },
    th: { bold: true, fillColor: "#EEEEEE" },
  },
};

const pdfMakeStyles = {
  "t-d": {
    width: 10,
  },
  "t-v": {
    width: 60,
  },
  "c-1": {
    width: 25,
    alignment: "center",
  },
  "c-2": {
    width: "auto",
  },
  "c-row": {
    fillColor: "#EEEEEE",
  },
  "n-a": {
    fillColor: "#5A5A5A",
  },
};

const StyledIframe = styled("iframe", {
  border: "none",
  width: "100%",
  height: "100%",
});

function checkRound(num) {
  if (num == null || num == undefined) return num;
  return parseFloat(num).toFixed(2);
}

const Report = React.memo(function Report({
  tableData,
  setPdfUrl,
  gstin,
  remarkFiles,
}) {
  let [iFrameSrc, setIFrameSrc] = useState("");

  console.log({ reportData: tableData, remarks: remarkFiles });

  let { table1, table2, table3, table4, table5 } = tableData;

  var html = htmlToPdfmake(
    `<div style="font-size: 10px">
  <div style="text-align: center">
    <strong>GOVERNMENT OF UTTARPRADESH</strong>
    <strong>COMMERCIAL TAX DEPARTMENT</strong>

    <p style="font-weight: bold">
      Attachment to Show Cause Notice in Form DRC-01
    </p>
  </div>

  <table style="width: 100%; text-align: left" border="2" cellpadding="5">
    <tbody>
      <tr style="height: 21px">
        <td style="width: 50%">DIN</td>
        <td style="width: 50%"></td>
      </tr>
      <tr style="height: 21px">
        <td style="width: 50%">Office Details</td>
        <td style="width: 50%">DEPUTY COMMISSIONER (ST)</td>
      </tr>
      <tr style="height: 21.5px">
        <td style="width: 50%">
          <p>Details of Tax payer<br />Name</p>
          <p>Legal Name</p>
          <p>GSTIN</p>
        </td>
        <td style="width: 50%">
          <p>Details of Tax payer<br />Name</p>
          <p>Legal Name</p>
          <p>${gstin}</p>
        </td>
      </tr>
      <tr style="height: 21px">
        <td style="width: 50%">Financial Year</td>
        <td style="width: 50%">2016-17</td>
      </tr>
    </tbody>
  </table>
  You have filed an annual return in GSTR-09 for the financial year 2017-18 On
  examination of the information furnished in this return under various heads
  and also the information furnished in TRAN-1, GSTR-01, GSTR-2A, GSTR-3B, EWB
  and other records available in this office, it is found that you have not
  declare your correct tax liability while filing the annual returns of GSTR-09,
  The summary of under declared tax is as shown: <br />
  SGST Rs. ${checkRound(table5?.row1?.samt) ?? "-"} <br />
  CGST Rs. ${checkRound(table5?.row1?.camt) ?? "-"} <br />
  IGST Rs. ${checkRound(table5?.row1?.iamt) ?? "-"} <br />
  Total Rs. ${checkRound(table5?.row1?.total) ?? "-"} <br />

  <p>The details of the liability are as follows:</p>

  <ol style="list-style: none">
    <li>
      <strong>
        1. Net tax under declaration due to non-reconciliation of turnover in
        other returns and E-way bill information
      </strong>
      <p>
        In addition to the above declared turnovers with respect to GSTR-09. it
        is seen to have been under declared turnover-3 with respect to other
        information available in this office.
      </p>
      <ul style="list-style: none">
        <li>
          <strong>&#x2022; Reconciliation of GSTR-01 GSTR-09:</strong>
          <p>
            the outward supplies turnover declared GSTR-01 is greater than the
            net outward supply information furnished in GSTR 09 And arrived at
            box 1A(1) and 1A(2) above. This amount is therefore proposed to be
            taxed as under declared outward supplies as follows:
          </p>
        </li>
      </ul>

      <table
        style="width: 100%"
        border="2"
        cellpadding="2"
        data-pdfmake="{'widths':[25,'*', 65, 65, 65, 65]}"
      >
        <tbody>
          <tr>
            <th>S.No.</th>
            <th>Issue</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
          <tr style="text-align: center">
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>E</td>
            <td>F</td>
          </tr>
          <tr>
            <td style="text-align: center">1</td>
            <td>Tax on Outward supplies declared in GSTR-01 for the FY</td>
            <td>${checkRound(table1?.row1?.samt) ?? "-"}</td>
            <td>${checkRound(table1?.row1?.camt) ?? "-"}</td>
            <td>${checkRound(table1?.row1?.iamt) ?? "-"}</td>
            <td>${checkRound(table1?.row1?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td style="text-align: center">2</td>
            <td>
              Less tax on Outward supplies arrived in GSTR-09 at Box 1A(1) +
              1A(2)
            </td>
            <td>${checkRound(table1?.row2?.samt) ?? "-"}</td>
            <td>${checkRound(table1?.row2?.camt) ?? "-"}</td>
            <td>${checkRound(table1?.row2?.iamt) ?? "-"}</td>
            <td>${checkRound(table1?.row2?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td style="text-align: center">3</td>
            <td>Difference (1 - 2)</td>
            <td>${checkRound(table1?.row3?.samt) ?? "-"}</td>
            <td>${checkRound(table1?.row3?.camt) ?? "-"}</td>
            <td>${checkRound(table1?.row3?.iamt) ?? "-"}</td>
            <td>${checkRound(table1?.row3?.total) ?? "-"}</td>
          </tr>
        </tbody>
      </table>
    </li>
    <li>
      <strong>2. Excess claim of ITC: </strong>
      <ul style="list-style: none">
        <li>
          <strong
            >&#x2022; Excess ITC claimed in GSTR-3B compared to GSTR-09:</strong
          >
          <p>
            You have claimed excess ITC in GSTR-3B as compared to the net ITC
            available in the annual return GSTR-09 which has resulted in an
            underpayment of tax as follows:
          </p>
        </li>
      </ul>
      <table
        style="width: 100%; vertical-align: middle"
        border="2"
        data-pdfmake="{'widths':[25,'*', 50, 65, 65, 65, 65]}"
        cellpadding="4"
      >
        <tbody>
          <tr class="c-row">
            <th>S.No.</th>
            <th>Description</th>
            <th>Table No. in GSTR-09</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
          <tr style="text-align: center">
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>E</td>
            <td>F</td>
            <td>G</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Eligible ITC in GSTR-3B</td>
            <td>6A</td>
            <td>${checkRound(table2?.row1?.samt) ?? "-"}</td>
            <td>${checkRound(table2?.row1?.camt) ?? "-"}</td>
            <td>${checkRound(table2?.row1?.iamt) ?? "-"}</td>
            <td>${checkRound(table2?.row1?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              ITC pertaining to previous year but availed in the current year
            </td>
            <td>(13 (-) 12) of previous GSTR-09</td>
            <td>${checkRound(table2?.row2?.samt) ?? "-"}</td>
            <td>${checkRound(table2?.row2?.camt) ?? "-"}</td>
            <td>${checkRound(table2?.row2?.iamt) ?? "-"}</td>
            <td>${checkRound(table2?.row2?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Net ITC available in the current year</td>
            <td>S.No. 1 (-) S.No. 2</td>
            <td>${checkRound(table2?.row3?.samt) ?? "-"}</td>
            <td>${checkRound(table2?.row3?.camt) ?? "-"}</td>
            <td>${checkRound(table2?.row3?.iamt) ?? "-"}</td>
            <td>${checkRound(table2?.row3?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Total ITC availed in GSTR 09</td>
            <td>6O</td>
            <td>${checkRound(table2?.row4?.samt) ?? "-"}</td>
            <td>${checkRound(table2?.row4?.camt) ?? "-"}</td>
            <td>${checkRound(table2?.row4?.iamt) ?? "-"}</td>
            <td>${checkRound(table2?.row4?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>ITC avail in GSTR-3B in excess of GSTR-09</td>
            <td>S.No. 3 (-) 6O</td>
            <td>${checkRound(table2?.row5?.samt) ?? "-"}</td>
            <td>${checkRound(table2?.row5?.camt) ?? "-"}</td>
            <td>${checkRound(table2?.row5?.iamt) ?? "-"}</td>
            <td>${checkRound(table2?.row5?.total) ?? "-"}</td>
          </tr>
        </tbody>
      </table>
      <ul style="list-style: none">
        <li>
          <strong>
            &#x2022; ITC to be reversed on non-business transactions and exempt
            supplies:
          </strong>
          <p>
            Under Section 17(1) and (2) where good or services or both are used
            by the registered person partly for the purpose of business, partly
            for other purposes or partly used for effecting exempt supply and
            partly for taxable supply then the amount of credit shall be
            restricted to so much of the input tax as is attributable to the
            taxable supplies in the course of business. Therefore the taxable
            person needs to make an apportionment of available input tax credit
            under Rule 42 & 43 to arrive at eligible ITC.
          </p>
          <p>
            However from the GSTR 09 return filed it is evident that you have
            not made such apportionment resulting in excess claim of ITC than
            you are eligible. The details of working are as under:
          </p>
        </li>
      </ul>
      <table
        style="width: 100%"
        border="2"
        cellpadding="4"
        data-pdfmake="{'widths':[25,'*', 70, 80, 70, 70, 70]}"
      >
        <tbody>
          <tr style="height: 21px">
            <th>S.No.</th>
            <th>Issue</th>
            <th>Table No. in GSTR-09</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
          <tr style="height: 21px; text-align: center">
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>E</td>
            <td>F</td>
            <td>G</td>
          </tr>
          <tr style="height: 21px">
            <td>1</td>
            <td>Total supplies</td>
            <td>5N + 10 - 11</td>
            <td>${checkRound(table3?.row1?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row1?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row1?.iamt) ?? "-"}</td>
            <td>${checkRound(table3?.row1?.total) ?? "-"}</td>
          </tr>
          <tr style="height: 21px">
            <td>2</td>
            <td>Exempt supplies</td>
            <td>5C + 5D + 5E + 5F</td>
            <td>${checkRound(table3?.row2?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row2?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row2?.iamt) ?? "-"}</td>

            <td>${checkRound(table3?.row2?.total) ?? "-"}</td>
          </tr>
          <tr style="height: 21px">
            <td>3</td>
            <td>
              Proportion of common ITC which has to be reversed to the extent of
              exempt supply (2/1 above)
            </td>
            <td></td>
            <td>${checkRound(table3?.row3?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row3?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row3?.iamt) ?? "-"}</td>

            <td>${checkRound(table3?.row3?.total) ?? "-"}</td>
          </tr>
          <tr style="height: 21px">
            <td>4</td>
            <td>Common input tax credit</td>
            <td>6) + 13 - 12</td>
            <td>${checkRound(table3?.row4?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row4?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row4?.iamt) ?? "-"}</td>

            <td>${checkRound(table3?.row4?.total) ?? "-"}</td>
          </tr>
          <tr style="height: 21px">
            <td>5</td>
            <td>ITC to be reversed</td>
            <td>(S.No.4 (x) S.No.2)/S.No.1</td>
            <td>${checkRound(table3?.row5?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row5?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row5?.iamt) ?? "-"}</td>

            <td>${checkRound(table3?.row5?.total) ?? "-"}</td>
          </tr>
          <tr style="height: 21.5px">
            <td>6</td>
            <td>ITC reversed as per GSTR-09</td>
            <td>7C + 7D + 7F + 7G</td>
            <td>${checkRound(table3?.row6?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row6?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row6?.iamt) ?? "-"}</td>

            <td>${checkRound(table3?.row6?.total) ?? "-"}</td>
          </tr>
          <tr style="height: 21px">
            <td>7</td>
            <td>Difference/Excess ITC claimed</td>
            <td>S.No 5 (-) S.N0. 6</td>
            <td>${checkRound(table3?.row7?.samt) ?? "-"}</td>
            <td>${checkRound(table3?.row7?.camt) ?? "-"}</td>
            <td>${checkRound(table3?.row7?.iamt) ?? "-"}</td>

            <td>${checkRound(table3?.row7?.total) ?? "-"}</td>
          </tr>
        </tbody>
      </table>
      Therefore, the excess ITC claimed is proposed to be recovered.
      <ul style="list-style: none">
        <li>
          <strong>
            &#x2022; ITC claimed from canceled dealers return defaulters and tax
            non payers:
          </strong>
          <p>
            Under Sec 18(2)(c) every registered person shall be entitled to take
            credit of ITC on supply of goods or services to him, subject to the
            condition that the tax charged in respect of such supply has been
            actually paid to the government, either in cash or through
            utilization of ITC admissible in respect of such supply.
          </p>
          <p>
            However, as seen from the office records, it is observed that you
            have taken ITC from the taxpayers who have not paid tax on their
            outward supplies to you.
          </p>
        </li>
      </ul>
      <table
        style="width: 100%"
        border="2"
        cellpadding="2"
        data-pdfmake="{'widths':[25,'*', 65, 65, 65, 65]}"
      >
        <tbody>
          <tr>
            <th>S.No.</th>
            <th>Issue</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
          <tr style="text-align: center">
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>E</td>
            <td>F</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Supplier registration canceled before date of invoice</td>
            <td>${checkRound(table4?.row1?.samt) ?? "-"}</td>
            <td>${checkRound(table4?.row1?.camt) ?? "-"}</td>
            <td>${checkRound(table4?.row1?.iamt) ?? "-"}</td>
            <td>${checkRound(table4?.row1?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              Supply failed to file GSTR-3B and did not pay tax on the invoices
              declared in GSTR-01
            </td>
            <td>${checkRound(table4?.row2?.samt) ?? "-"}</td>
            <td>${checkRound(table4?.row2?.camt) ?? "-"}</td>
            <td>${checkRound(table4?.row2?.iamt) ?? "-"}</td>
            <td>${checkRound(table4?.row2?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              Supplier filed GSTR-3B with Nil Turnover and did not declare or
              pay tax corresponding to the invoices declared in GSTR-01
            </td>
            <td>${checkRound(table4?.row3?.samt) ?? "-"}</td>
            <td>${checkRound(table4?.row3?.camt) ?? "-"}</td>
            <td>${checkRound(table4?.row3?.iamt) ?? "-"}</td>
            <td>${checkRound(table4?.row3?.total) ?? "-"}</td>
          </tr>
          <tr>
            <td></td>
            <td>Total</td>
            <td>${checkRound(table4?.row4?.samt) ?? "-"}</td>
            <td>${checkRound(table4?.row4?.camt) ?? "-"}</td>
            <td>${checkRound(table4?.row4?.iamt) ?? "-"}</td>
            <td>${checkRound(table4?.row4?.total) ?? "-"}</td>
          </tr>
        </tbody>
      </table>
    </li>
    The above amount of ITC is proposed to be recovered
  </ol>

  <p>
    <strong>Summary:</strong>

    <br /><br />

    The total tax payable on account of these deficiencies after giving credit
    to the payments made in cash and ITC adjusted is arrived as follows:
  </p>

  <table
    style="width: 100%"
    border="2"
    cellpadding="2"
    data-pdfmake="{'widths':[25,'*', 65, 65, 65, 65]}"
  >
    <tbody>
      <tr>
        <th>S.No.</th>
        <th>Issue</th>
        <th>SGST</th>
        <th>CGST</th>
        <th>IGST</th>
        <th>Total</th>
      </tr>
      <tr style="text-align: center">
        <td>A</td>
        <td>B</td>
        <td>C</td>
        <td>D</td>
        <td>E</td>
        <td>F</td>
      </tr>
      <tr>
        <td style="text-align: center">1</td>
        <td>Total tax due in (1) + (2) above</td>
        <td>${checkRound(table5?.row1?.samt) ?? "-"}</td>
        <td>${checkRound(table5?.row1?.camt) ?? "-"}</td>
        <td>${checkRound(table5?.row1?.iamt) ?? "-"}</td>
        <td>${checkRound(table5?.row1?.total) ?? "-"}</td>
      </tr>
    </tbody>
  </table>
  <strong>
    (The detailed workings of the above in tabular form are attached as
    Annexures)
  </strong>
  <p>
    Therefore, it is proposed to assess the registered taxpayer for the net tax
    payable indicated above under Section 73 of the SGST/CGST Act. The
    registered taxpayer may therefore pay the tax, along with the interest in
    DRC-03. However, If the registered taxpayer is not agreeing with the
    proposals in this notice, they may file their objections in DRC-06 within
    (15) days from the day of receipt of this notice. A draft standard format is
    also attached for filing your response along with your detailed reply.
  </p>
</div>
`,
    html2pdfmakeStyles
  );

  // https://aymkdn.github.io/html-to-pdfmake/index.html

  let iframeContainer = useRef(null);

  let docDefinition = useRef({
    content: [html],
    styles: pdfMakeStyles,
  });

  async function handleMerging(pdfs) {
    console.log({ pdfs });
    const merger = new PDFMerger();
    for (let i = 0; i < pdfs.length; i++) {
      console.log({ pdf: pdfs[i] });
      await merger.add(pdfs[i]);
    }
    const finalPDF = await merger.saveAsBlob();
    const url = URL.createObjectURL(finalPDF);
    console.log({ url });
    setIFrameSrc(url);
    setPdfUrl(url);
  }

  useEffect(() => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition.current);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      setIFrameSrc(dataUrl);
      setPdfUrl(dataUrl);
    });
    async function handleRemarks(pdfDocGenerator) {
      let remarksPDFs = [];
      pdfDocGenerator.getBlob(async (blob) => {
        let ab = await blob.arrayBuffer();
        remarksPDFs.push(ab);
        await remarkFiles.forEach(async ({ file, arrayBuffer }) => {
          console.log({ file, arrayBuffer });
          if (file.type === "application/pdf") {
            // pdf file
            remarksPDFs.push(arrayBuffer);
            if (remarksPDFs.length == remarkFiles.length + 1) {
              await handleMerging(remarksPDFs);
            }
            return;
          }
          let { value } = await mammoth.convertToHtml({
            arrayBuffer: arrayBuffer,
          });
          let pdfDocGen = pdfMake.createPdf({
            content: [htmlToPdfmake(value, html2pdfmakeStyles)],
            styles: pdfMakeStyles,
          });
          pdfDocGen.getBlob(async (blob) => {
            console.log({ blob });
            let ab = await blob.arrayBuffer();
            remarksPDFs.push(ab);
            if (remarksPDFs.length == remarkFiles.length + 1) {
              await handleMerging(remarksPDFs);
            }
          });
        });
      });
    }
    handleRemarks(pdfDocGenerator);
  }, [setPdfUrl, tableData, remarkFiles]);
  return (
    <StyledIframe ref={iframeContainer} src={iFrameSrc + "#page=1&view=FitH"} />
  );
});

export default Report;
