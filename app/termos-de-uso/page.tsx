import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Termos de uso para as utilidades gratuitas 100% no navegador fornecidas pelo ${site.name}.`,
  alternates: { canonical: "/termos-de-uso" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Termos de Uso — ${site.name}`,
    description: `Termos de uso para as utilidades gratuitas 100% no navegador fornecidas pelo ${site.name}.`,
    url: `${site.url}/termos-de-uso`,
    locale: "pt_BR",
  },
};

const updated = "19 de outubro de 2026";

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink">
        {n}. {title}
      </h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div
      className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14"
      lang="pt-BR"
    >
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Termos de Uso</h1>
      <p className="mt-2 text-sm text-ink-3">Última atualização: {updated}</p>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-ink-2">
        <Section n="1" title="Aceitação destes termos">
          <p>
            Boas-vindas ao {site.name}. Ao acessar ou utilizar {site.url}, você concorda em ficar
            vinculado a estes Termos de Uso, à nossa{" "}
            <Link href="/politica-de-privacidade" className="font-medium text-accent">
              Política de Privacidade
            </Link>{" "}
            e a quaisquer outros termos aqui referenciados. Se você não concorda com qualquer parte
            destes termos, pare de utilizar o serviço.
          </p>
        </Section>

        <Section n="2" title="Sobre o serviço">
          <p>
            O {site.name} oferece um conjunto de aplicações utilitárias gratuitas para
            desenvolvedores de software, engenheiros de DevOps e profissionais de TI — incluindo
            formatação e validação de JSON, geração de tipos TypeScript, codificação Base64 e
            geração de UUID. Todas as ferramentas rodam inteiramente no seu navegador
            (client-side) e não exigem conta nem cadastro.
          </p>
        </Section>

        <Section n="3" title="Uso das ferramentas">
          <p>
            Você pode usar as ferramentas gratuitamente para fins pessoais, acadêmicos e
            profissionais. Você concorda em não: (a) usar as ferramentas para processar dados
            ilegais, que violem direitos ou maliciosos; (b) tentar interromper, sobrecarregar,
            fazer engenharia reversa ou interferir de qualquer outra forma no serviço; (c) usar as
            ferramentas para gerar ou distribuir spam, malware ou conteúdo nocivo; ou (d) revender,
            coletar de forma automatizada ou explorar comercialmente o serviço sem nosso consentimento
            prévio por escrito.
          </p>
        </Section>

        <Section n="4" title="Tratamento dos seus dados — ressalva">
          <p>
            As ferramentas processam os dados localmente, dentro do seu navegador. O {site.name} não
            recebe, não envia, não armazena e não registra o conteúdo que você processa. Em
            consequência disso, não podemos responder por perdas, danos ou divulgações
            involuntárias decorrentes do modo como você trata os seus próprios dados — incluindo a
            transmissão deles pela sua rede — nem pelo uso dos recursos de processamento do seu
            dispositivo.
          </p>
        </Section>

        <Section n="5" title="Precisão das saídas">
          <p>
            Trabalhamos para manter cada utilitária correta e confiável, mas as saídas são geradas
            para a sua conveniência e podem conter erros. É responsabilidade sua validar, testar e
            revisar qualquer código, configuração, hash, schema ou outro resultado antes de adotá-lo
            em ambientes de produção, sistemas automatizados ou contextos sensíveis em termos de
            segurança. Nunca use hashes ou saídas codificadas como mecanismo de segurança sem
            verificação independente.
          </p>
        </Section>

        <Section n="6" title="Propriedade intelectual">
          <p>
            O design do site, os textos, os logotipos, as marcas registradas e o software subjacente
            do {site.name} são propriedade nossa ou de seus respectivos donos e estão protegidos
            pelas leis de propriedade intelectual aplicáveis. A saída gerada pelas ferramentas
            pertence a você e pode ser usada livremente em seus projetos. Marcas de terceiros
            mencionadas neste site pertencem aos seus respectivos donos e são referenciadas apenas
            para fins de identificação.
          </p>
        </Section>

        <Section n="7" title="Publicidade e afiliados">
          <p>
            O site exibe publicidade por meio de parceiros de terceiros, incluindo o Google AdSense,
            para manter as ferramentas gratuitas. Também podemos incluir links de afiliados para
            provedores de nuvem, hospedagem e ferramentas de desenvolvimento. Clicar em um anúncio
            ou link de afiliado pode gerar uma comissão para nós, sem custo adicional para você, e
            pode levar você a sites de terceiros submetidos aos seus próprios termos e políticas de
            privacidade, pelos quais não respondemos.
          </p>
        </Section>

        <Section n="8" title="Ausência de garantia">
          <p>
            O serviço é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;, sem garantias
            de qualquer natureza, expressas ou implícitas, incluindo garantias implícitas de
            comercialização, adequação a uma finalidade específica e não infração. Não garantimos
            que o serviço seja ininterrupto, livre de erros, seguro ou sempre disponível.
          </p>
        </Section>

        <Section n="9" title="Limitação de responsabilidade">
          <p>
            Na máxima extensão permitida pela legislação aplicável, o {site.name} e seus
            colaboradores não respondem por quaisquer danos indiretos, incidentais, especiais,
            consequentes ou punitivos, nem por perdas de lucros, dados, reputação ou oportunidades
            de negócio, decorrentes do uso ou da impossibilidade de uso do serviço, ainda que
            informados sobre a possibilidade de tais danos.
          </p>
        </Section>

        <Section n="10" title="Serviços de terceiros">
          <p>
            O serviço pode integrar ou direcionar para produtos, analytics e redes de publicidade
            de terceiros. Não controlamos esses terceiros e não assumimos responsabilidade pelo
            seu conteúdo, disponibilidade, práticas ou políticas. A sua interação com eles está
            sujeita aos seus próprios termos e políticas de privacidade.
          </p>
        </Section>

        <Section n="11" title="Alterações no serviço e nestes termos">
          <p>
            Podemos modificar, ampliar, descontinuar ou aposentar qualquer ferramenta, recurso ou
            parte do serviço a qualquer momento, com ou sem aviso. Também podemos revisar estes
            Termos de Uso; a versão atualizada valerá a partir da sua data de &quot;última
            atualização&quot;. O uso contínuo do serviço após as alterações constitui aceitação dos
            termos revisados.
          </p>
        </Section>

        <Section n="12" title="Legislação aplicável e resolução de disputas">
          <p>
            Estes termos são regidos pelas leis brasileiras. As partes se submetem à jurisdição
            exclusiva dos中级人民法院 competentes do Brasil para qualquer disputa oriunda destes
            termos, sem prejuízo das regras de proteção ao consumidor que sejam obrigatórias no
            local onde você reside.
          </p>
        </Section>

        <Section n="13" title="Contato">
          <p>
            Dúvidas sobre estes termos? Escreva para{" "}
            <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
              {site.legalEmail}
            </a>{" "}
            ou use a{" "}
            <Link href="/contato" className="font-medium text-accent">
              página de contato
            </Link>
            .
          </p>
        </Section>
      </div>

      <p className="mt-10 text-sm text-ink-3">
        Consulte também a{" "}
        <Link href="/politica-de-privacidade" className="font-medium text-accent">
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  );
}
