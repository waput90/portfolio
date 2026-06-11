
interface DownloadResumePdfProps {
    yearsExperience: number
    releaseCount: number
    reviewCount: number
}

  export const downloadResumePdf = async ({ yearsExperience, releaseCount, reviewCount }: DownloadResumePdfProps) => {
    
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    const left = 48

    doc.setFillColor(14, 23, 46)
    doc.rect(0, 0, 595, 120, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.text('James Tubiano', left, 58)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text('Senior .NET Engineer | React Frontend Enthusiast', left, 82)

    doc.setTextColor(25, 25, 25)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('Recruiter Summary', left, 155)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(
      `Software engineer with ${yearsExperience}+ years building web products using C#, ASP.NET Core, Angular, and React.`,
      left,
      176,
    )
    doc.text('Strong track record in feature delivery, API integration, code review collaboration, and production support.', left, 194)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('Core Stack', left, 230)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('C#, .NET Core, ASP.NET MVC, JavaScript, TypeScript, React, Angular, SQL, REST APIs', left, 251)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('Impact Highlights', left, 287)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`- ${releaseCount}+ production releases and feature cycles across fintech and loan platforms`, left, 308)
    doc.text(`- ${reviewCount}+ pull request review interactions and team collaboration touch points`, left, 326)
    doc.text('- Built and maintained legacy + modern applications with high business visibility', left, 344)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('Recent Roles', left, 380)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Senior Software Engineer - ConnectOS / LoanMarket (2023 - Present)', left, 401)
    doc.text('.NET Consultant - DevPartners / LoanMarket (2022 - 2023)', left, 419)
    doc.text('.NET Developer - Interactive Partners (2021 - 2022)', left, 437)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('Contact', left, 473)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Email: tubianojames@gmail.com', left, 494)
    doc.text('Location: Davao City, Philippines', left, 512)
    doc.text('GitHub: github.com/waput90', left, 530)
    doc.text('LinkedIn: ph.linkedin.com/in/james-t-140428149/tl', left, 548)

    doc.save('James-Tubiano-Recruiter-OnePager.pdf')
  }