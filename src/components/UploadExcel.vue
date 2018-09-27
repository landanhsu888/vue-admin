<template>
  <div>
    <input id="excel-upload-input" ref="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div id="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop excel file here or
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">Browse</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import XLSX from 'xlsx'

@Component({
  name: 'BackToTop',
  })
class UploadExcel extends Vue {
  @Prop()
  public beforeUpload!: Function
  @Prop()
  public onSuccess!: Function

  // data
  public loading: boolean = false
  public excelData: any = {
    header: null,
    results: null
  }

  // method
  private generateData ({ header, results }:any): void {
    this.excelData.header = header
    this.excelData.results = results
    this.onSuccess && this.onSuccess(this.excelData)
  }

  private handleDrop (e: any) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    }

  // method
  private handleDragover (e: any): void {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  private handleUpload (): void {
    let document:any = window.document
    document.getElementById('excel-upload-input').click()
  }

  private handleClick(this: any, e: any): void {
    const files = e.target.files
    const rawFile = files[0] // only use files[0]
    if (!rawFile) return
    this.upload(rawFile)
  }

  private upload(rawFile: any) {
    let $excelUploadInput:any = this.$refs['excel-upload-input']
    $excelUploadInput.value = null // fix can't select the same excel

    if (!this.beforeUpload) {
      this.readerData(rawFile)
      return
    }
    const before = this.beforeUpload(rawFile)
    if (before) {
      this.readerData(rawFile)
    }
  }

  private readerData(rawFile: any) {
    this.loading = true
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const data = e.target.result
        const fixedData = this.fixData(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.getHeaderRow(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.generateData({ header, results })
        this.loading = false
        resolve()
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  private fixData (data: any) {
    let o = ''
    let l = 0
    const w = 10240
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
    return o
  }

  private getHeaderRow(sheet: any) {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    let C
    const R = range.s.r
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }

  private isExcel (file :any) {
    return /\.(xlsx|xls|csv)$/.test(file.name)
  }
}

export default UploadExcel
</script>

<style scoped lang="scss">
  #excel-upload-input{
    display: none;
    z-index: -9999;
  }

  #drop{
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
</style>
