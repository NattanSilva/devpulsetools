import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como o ${site.name} processa dados — política de privacidade em conformidade com a LGPD e o GDPR, incluindo cookies e Google AdSense.`,
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Política de Privacidade — ${site.name}`,
    description: `Como o ${site.name} processa dados — política de privacidade em conformidade com a LGPD e o GDPR, incluindo cookies e Google AdSense.`,
    url: `${site.url}/politica-de-privacidade`,
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

export default function PrivacyPage() {
  return (
    <div
      className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14"
      lang="pt-BR"
    >
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
        Política de Privacidade
      </h1>
      <p className="mt-2 text-sm text-ink-3">Última atualização: {updated}</p>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-ink-2">
        <Section n="1" title="Introdução">
          <p>
            O {site.name} (&quot;nós&quot;) opera o site {site.url} e oferece um conjunto de utilitárias
            gratuitas para desenvolvedores que rodam inteiramente no navegador. Esta Política de
            Privacidade explica quais informações processamos, por que processamos e quais são os
            seus direitos sobre os seus dados pessoais, em conformidade com a Lei Geral de Proteção
            de Dados brasileira (LGPD — Lei nº 13.709/2018) e o Regulamento Geral de Proteção de
            Dados europeu (GDPR).
          </p>
          <p>
            O princípio central da plataforma é o <strong>processamento local</strong>: payloads
            JSON, textos, arquivos, hashes e quaisquer conteúdos que você cole em uma ferramenta
            são processados exclusivamente dentro do seu próprio navegador. Nunca recebemos,
            transmitimos, armazenamos ou processamos esse conteúdo em nossos servidores.
          </p>
        </Section>

        <Section n="2" title="Dados que NÃO coletamos">
          <p>
            Como todo o processamento acontece no seu dispositivo, não coletamos, não armazenamos e
            não temos acesso aos dados que você submete às ferramentas — incluindo textos colados,
            arquivos carregados, saídas geradas ou histórico de downloads. Não existem contas, nem
            perfis de usuário, nem identificadores pessoais persistentes vinculados ao uso das
            ferramentas.
          </p>
        </Section>

        <Section n="3" title="Dados que podemos coletar">
          <p>
            Podemos processar dados técnicos não pessoais ou anonimizados para operar e melhorar o
            site, como visualizações agregadas de página, tipo de dispositivo, família de navegador
            e região aproximada. Esses dados servem para medir desempenho, diagnosticar erros e
            entender quais ferramentas são úteis — sempre de forma agregada e nunca para identificar
            você individualmente.
          </p>
        </Section>

        <Section n="4" title="Cookies e armazenamento local">
          <p>
            O site usa o armazenamento local do navegador exclusivamente para lembrar preferências
            de interface, como o tema claro ou escuro escolhido. Essa preferência fica guardada
            localmente e não é transmitida para nós.
          </p>
          <p>
            Não definimos cookies de marketing próprios. No entanto, o nosso provedor de
            publicidade pode utilizar cookies, pixels ou tecnologias semelhantes para exibir
            anúncios com base em visitas anteriores a este e a outros sites, conforme descrito na
            seção de publicidade abaixo.
          </p>
        </Section>

        <Section n="5" title="Publicidade e identificadores de terceiros">
          <p>
            Financiamos as utilitárias gratuitas com publicidade veiculada pelo{" "}
            <strong>Google AdSense</strong> e seus parceiros certificados. O Google e seus parceiros
            podem usar cookies e identificadores de publicidade (como o Google Advertising ID no
            Android e o IDFA no iOS) para exibir anúncios, inclusive personalizados exibidos em
            outros sites, e para medir o desempenho dessas peças.
          </p>
          <p>
            Quando um anúncio é exibido, redes e fornecedores de anúncios de terceiros podem
            coletar ou receber informações do seu navegador ou dispositivo, como localização
            aproximada, páginas visitadas, anúncios exibidos e dados de interação — que podem ser
            combinados com identificadores para personalizar a publicidade. Esses terceiros são
            controladores de dados independentes e operam sob as suas próprias políticas de
            privacidade.
          </p>
          <p>
            Você pode desativar a publicidade personalizada em{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="font-medium text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Configurações de anúncios do Google
            </a>{" "}
            ou em{" "}
            <a
              href="https://www.aboutads.info/choices"
              className="font-medium text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aboutads.info/choices
            </a>
            . Para usuários do Espaço Econômico Europeu, do Reino Unido e da Suíça, utilizamos os
            frameworks de consentimento do AdSense (incluindo o TCF da IAB Europa, quando aplicável)
            para exibir anúncios personalizados de forma legal, e você verá um aviso de consentimento
            antes que esses anúncios sejam carregados.
          </p>
          <p>
            Também podemos incluir links de afiliados para provedores de ferramentas de
            desenvolvimento. Clicar nesses links pode gerar uma comissão para nós, sem qualquer
            custo adicional para você; o lojista que você visitar trata os seus dados sob a sua
            própria política de privacidade.
          </p>
        </Section>

        <Section n="6" title="Bases legais do tratamento (GDPR)">
          <p>
            Onde o GDPR se aplica, o tratamento dos seus dados se baseia: (a) no seu consentimento,
            que pode ser revogado a qualquer momento, para publicidade e personalização; (b) no
            nosso legítimo interesse em operar, proteger e melhorar o serviço, desde que os seus
            interesses e direitos fundamentais não prevalecam; e (c) no cumprimento de obrigações
            legais, como responder a requisições legítimas de autoridades competentes.
          </p>
        </Section>

        <Section n="7" title="Seus direitos de privacidade">
          <p>
            Dependendo da sua jurisdição, você pode ter direito a: acessar os dados pessoais que
            temos sobre você; solicitar a retificação de dados inexatos; solicitar a eliminação;
            restringir ou se opor ao tratamento; à portabilidade dos dados (LGPD art. 18 e GDPR
            art. 20); e revogar o consentimento a qualquer momento. Como as ferramentas processam o
            conteúdo localmente, a maior parte desses direitos se refere aos dados técnicos e
            publicitários limitados descritos acima.
          </p>
          <p>
            Para exercer qualquer um desses direitos, inclusive por meio de uma requisição de
            acesso do titular, entre em contato pelo e-mail{" "}
            <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
              {site.legalEmail}
            </a>
            . Respondemos dentro do prazo legalmente exigido e podemos pedir que você confirme sua
            identidade. Você também tem o direito de apresentar uma reclamação à autoridade de
            proteção de dados competente (como a ANPD no Brasil ou uma autoridade supervisory
            europeia).
          </p>
        </Section>

        <Section n="8" title="Transferências internacionais de dados">
          <p>
            Parceiros de publicidade e provedores de analytics que processam dados técnicos podem
            transferi-los para servidores fora do seu país de residência. Quando exigido pelo GDPR,
            essas transferências são protegidas por cláusulas contratuais padrão ou mecanismos
            válidos equivalentes, e as suas informações ficam sujeitas aos padrões descritos nesta
            política.
          </p>
        </Section>

        <Section n="9" title="Privacidade de crianças">
          <p>
            O serviço destina-se a desenvolvedores de software e profissionais de TI e não é dirigido
            a crianças menores de 13 anos (ou a idade mínima aplicável na sua jurisdição). Não
            coletamos conscientemente informações pessoais de crianças. Se você acreditar que uma
            criança nos forneceu dados pessoais, entre em contato conosco e vamos excluí-los.
          </p>
        </Section>

        <Section n="10" title="Segurança e retenção">
          <p>
            Aplicamos medidas técnicas e organizacionais adequadas para proteger os dados limitados
            que tratamos contra perda, uso indevido e acesso não autorizado. Dados técnicos e
            publicitários são mantidos apenas pelo tempo necessário para os fins descritos acima ou
            conforme exigido por lei, período após o qual são excluídos ou anonimizados.
          </p>
        </Section>

        <Section n="11" title="Alterações nesta política">
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Mudanças relevantes
            serão refletidas na data de &quot;última atualização&quot; no topo desta página. O uso
            contínuo do site após a entrada em vigor das alterações constitui aceitação da
            política revisada.
          </p>
        </Section>

        <Section n="12" title="Contato">
          <p>
            Dúvidas, comentários ou solicitações de privacidade:{" "}
            <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
              {site.legalEmail}
            </a>
            . Veja também a nossa{" "}
            <Link href="/contato" className="font-medium text-accent">
              página de contato
            </Link>{" "}
            para outras formas de falar com a gente.
          </p>
        </Section>
      </div>

      <p className="mt-10 text-sm text-ink-3">
        Consulte também os{" "}
        <Link href="/termos-de-uso" className="font-medium text-accent">
          Termos de Uso
        </Link>
        .
      </p>
    </div>
  );
}
